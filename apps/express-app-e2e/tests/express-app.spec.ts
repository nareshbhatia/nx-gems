import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('express-app e2e', () => {
  it('should create express-app', async () => {
    const plugin = uniq('express-app');
    ensureNxProject('@nx-gems/express-app', 'dist/libs/express-app');
    await runNxCommandAsync(
      `generate @nx-gems/express-app:express-app ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('express-app');
      ensureNxProject('@nx-gems/express-app', 'dist/libs/express-app');
      await runNxCommandAsync(
        `generate @nx-gems/express-app:express-app ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const plugin = uniq('express-app');
      ensureNxProject('@nx-gems/express-app', 'dist/libs/express-app');
      await runNxCommandAsync(
        `generate @nx-gems/express-app:express-app ${plugin} --tags e2etag,e2ePackage`
      );
      const project = readJson(`libs/${plugin}/project.json`);
      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
