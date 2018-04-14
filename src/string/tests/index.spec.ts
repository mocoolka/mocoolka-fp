import {
  hyphenate, camelCaseToArray, contains, notContains, ins, notIn, startsWith, endsWith,
  notStartsWith, notEndsWith
} from '../';
const input = 'firstColorHover';
describe('string', () => {
  it('ObjectToNamesString', () => {
    expect(hyphenate('firstColorHover', '_')).toEqual('first_color_hover');
    expect(hyphenate('firstColorHover')).toEqual('first-color-hover');
  }),
    it('camelCaseToArray', () => {
      expect(camelCaseToArray('firstColorHover')).toEqual(['first', 'color', 'hover']);
    });
  it('contains', () => {
    expect(contains('firstColorHover')(input)).toEqual(true);
    expect(contains('Color')(input)).toEqual(true);
    expect(contains('er')(input)).toEqual(true);
    expect(contains('fi')(input)).toEqual(true);
    expect(contains('abc')(input)).toEqual(false);
  });
  it('notContains', () => {
    expect(notContains('firstColorHover')(input)).toEqual(false);
    expect(notContains('Color')(input)).toEqual(false);
    expect(notContains('er')(input)).toEqual(false);
    expect(notContains('fi')(input)).toEqual(false);
    expect(notContains('abc')(input)).toEqual(true);
  });
  it('ins', () => {
    expect(ins(['firstColorHover', 'b'])(input)).toEqual(true);
    expect(ins(['firstColorHover1', 'b'])(input)).toEqual(false);
  });
  it('notIn', () => {
    expect(notIn(['firstColorHover', 'b'])(input)).toEqual(false);
    expect(notIn(['firstColorHover1', 'b'])(input)).toEqual(true);
  });
  it('startsWith', () => {
    expect(startsWith('firstColorHover')(input)).toEqual(true);
    expect(startsWith('firstColorHove')(input)).toEqual(true);
    expect(startsWith('b')(input)).toEqual(false);
  });
  it('notStartsWith', () => {
    expect(notStartsWith('firstColorHover')(input)).toEqual(false);
    expect(notStartsWith('firstColorHove')(input)).toEqual(false);
    expect(notStartsWith('b')(input)).toEqual(true);
  });
  it('endsWith', () => {
    expect(endsWith('firstColorHover')(input)).toEqual(true);
    expect(endsWith('Hover')(input)).toEqual(true);
    expect(endsWith('b')(input)).toEqual(false);
  });
  it('notEndsWith', () => {
    expect(notEndsWith('firstColorHover')(input)).toEqual(false);
    expect(notEndsWith('Hover')(input)).toEqual(false);
    expect(notEndsWith('b')(input)).toEqual(true);
  });
});
