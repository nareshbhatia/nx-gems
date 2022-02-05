import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  installPackagesTask,
  names,
  offsetFromRoot,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/express';
import * as path from 'path';
import { ExpressAppGeneratorSchema } from './schema';
import {
  corsTypingsVersion,
  corsVersion,
  morganTypingsVersion,
  morganVersion,
} from '../../utils/versions';

interface NormalizedSchema extends ExpressAppGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeSchema(
  tree: Tree,
  schema: ExpressAppGeneratorSchema
): NormalizedSchema {
  const name = names(schema.name).fileName;
  const projectDirectory = schema.directory
    ? `${names(schema.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const parsedTags = schema.tags
    ? schema.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...schema,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, schema: NormalizedSchema) {
  const substitutions = {
    ...schema,
    ...names(schema.name),
    offsetFromRoot: offsetFromRoot(schema.projectRoot),
    // remove __tmpl__ from file endings
    tmpl: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    schema.projectRoot,
    substitutions
  );
}

function updateTsConfig(tree: Tree, schema: NormalizedSchema) {
  updateJson(tree, path.join(schema.projectRoot, 'tsconfig.app.json'), (json) => {
    json.compilerOptions.esModuleInterop = true;
    json.compilerOptions.types = [...json.compilerOptions.types, 'cors', 'morgan'];
    return json;
  });
}

export default async function (tree: Tree, schema: ExpressAppGeneratorSchema) {
  // generate express application
  await applicationGenerator(tree, schema);

  const normalizedSchema = normalizeSchema(tree, schema);
  // generate files with substitutions
  addFiles(tree, normalizedSchema);

  // update tsconfig.app.json
  updateTsConfig(tree, normalizedSchema);

  // add dependencies
  addDependenciesToPackageJson(
    tree,
    {
      cors: corsVersion,
      morgan: morganVersion,
    },
    {
      '@types/cors': corsTypingsVersion,
      '@types/morgan': morganTypingsVersion,
    }
  );

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
