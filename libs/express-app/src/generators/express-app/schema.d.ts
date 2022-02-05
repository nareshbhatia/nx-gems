import type { Linter } from '@nrwl/linter';

export interface ExpressAppGeneratorSchema {
  name: string;
  skipFormat: boolean;
  skipPackageJson: boolean;
  directory?: string;
  unitTestRunner: string;
  tags?: string;
  linter: Linter;
  frontendProject?: string;
  babelJest?: boolean;
  js: boolean;
  pascalCaseFiles: boolean;
  standaloneConfig?: boolean;
  setParserOptionsProject?: boolean;
}
