import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';

import generator from './generator';
import { ExpressAppGeneratorSchema } from './schema';

describe('express-app generator', () => {
  let appTree: Tree;
  const options: ExpressAppGeneratorSchema = {
    name: 'test',
    skipFormat: false,
    skipPackageJson: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    js: false,
    pascalCaseFiles: false,
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
