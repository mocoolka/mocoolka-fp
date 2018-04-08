import { hyphenate, camelCaseToArray } from '../';

describe('Object', () => {
  it('ObjectToNamesString', () => {
    expect(hyphenate('firstColorHover', '_')).toEqual('first_color_hover');
    expect(hyphenate('firstColorHover')).toEqual('first-color-hover');
  }),
    it('camelCaseToArray', () => {
      expect(camelCaseToArray('firstColorHover')).toEqual(['first', 'color', 'hover']);
    });
});
