/* eslint-env jest */

const { runGrunt, grunt } = require('./utils/grunt');
const { config, file: { expand, readJSON } } = grunt;

const buildPath = config('path.build');

describe('Image Size task', () => {
  beforeEach(() => runGrunt(['clean']));

  it('should produce correct data file with defaults for single source', () =>
    runGrunt(['image_size:singleWithDefaults']).then(() =>
      expect(readJSON(buildPath.singleWithDefaults)).toMatchSnapshot()
    ));

  it('should produce correct data file with defaults for multiple sources', () =>
    runGrunt(['image_size:multipleWithDefaults']).then(() =>
      expect(readJSON(buildPath.multipleWithDefaults)).toMatchSnapshot()
    ));

  it('should produce correct data file with defaults for multiple nested sources', () =>
    runGrunt(['image_size:nestedWithDefaults']).then(() =>
      expect(readJSON(buildPath.nestedWithDefaults)).toMatchSnapshot()
    ));

  it('should produce correct data files with defaults for multiple nested expanded sources', () =>
    runGrunt(['image_size:expandedNestedWithDefaults']).then(() => {
      const buildedFilesPaths = expand(
        { filter: 'isFile' },
        `${buildPath.expandedNestedWithDefaults}/**`
      );

      expect(buildedFilesPaths).toMatchSnapshot();

      buildedFilesPaths.forEach(filepath =>
        expect(readJSON(filepath)).toMatchSnapshot()
      );
    }));

  it('should produce correct data file with `processName` option for single source', () =>
    runGrunt(['image_size:singleWithProcessName']).then(() =>
      expect(readJSON(buildPath.singleWithProcessName)).toMatchSnapshot()
    ));

  it('should produce correct data file with `processEntry` option for single source', () =>
    runGrunt(['image_size:singleWithProcessEntry']).then(() =>
      expect(readJSON(buildPath.singleWithProcessEntry)).toMatchSnapshot()
    ));

  it('should produce correct data file with `processSizes` option for single source', () =>
    runGrunt(['image_size:singleWithProcessSizes']).then(() =>
      expect(readJSON(buildPath.singleWithProcessSizes)).toMatchSnapshot()
    ));

  // @todo This can't be tested ringht now because there is no way to access Grunt context after
  //       task has been accomplished. The only way isn't implemented yet.implemented
  //       See https://github.com/gruntjs/grunt/issues/1184

  // it('should produce correct data file with `processSizes` option for single source', () =>
  //   runGrunt(['image_size:singleWithConfigObject']).then(() => {}));

  // it('should produce correct data file with `processSizes` option for single source', () =>
  //   runGrunt(['image_size:singleWithConfigObjectAndDest']).then(() => {}));

  it('should error on not image file', () =>
    expect(runGrunt(['image_size:notImage'])).rejects.toBeDefined());
});
