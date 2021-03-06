# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

For changes before version 2.2.0, please see the commit history

## [4.1.1] - 2017-03-29
### Added
- Use process.emitWarning if it is available (new Node.js) @SimenB

## [4.0.0] - 2017-03-22
### Fixed
- Fix for EventAndListener in typescript definition. @thisboyiscrazy

### Added
- New Node 6 APIs such as `prependListener` and `eventNames`. @sebakerckhof

## [3.0.2] - 2017-03-06
### Fixed
- Fixed `emitAsync` when using `once`. @Moeriki

## [3.0.1] - 2017-02-21
### Changed
- Changed Typescript defintion to take array of strings for event name. @thisboyiscrazy

## [3.0.0] - 2017-01-23
### Changed
- Typescript definition now uses `EventEmitter2` instead of `EventEmitter2.eitter`. @gitawego

## [2.2.2] - 2017-01-17
### Fixed
- Typescript definition for `removeAllListeners` can take an array. @gitawego

## [2.2.1] - 2016-11-24
### Added
- Added missing parameters for emitAsync in typescript definition. @stanleytakamatsu

## [2.2.0] - 2016-11-14
### Added
- option to emit name of event that causes memory leak warning. @kwiateusz

### Fixed
- component.json and bower.json got updated with latest version. @kwiateusz
- missing globals in test suite got added in.  @kwiateusz
