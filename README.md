# Mocoolka-fp

mocoolka-fp is collection for  **function program** .
The extend on [fp-ts](https://github.com/gcanti/fp-ts) .

## Define Css Module

### Basic Css Property
Basic Css define stand css property and selector.

```
import { of, ofVariable, ofICss } from 'mocoolks-css';

export type CssPropertyType = {
    color?: string;
    backgroundColor?: string;
    marginLeft?: number | string;
    paddingLeft?: number | string;
    width?: number | string;
    transform?:string;
};
export type CssSelector = 'focus' | 'hover';

export const css = ofICss<CssSelector, CssPropertyType>({
    cssProperty: [{
        cssName: 'color',
        propertyName: 'color',
    }, {
        cssName: 'background-color',
        propertyName: 'backgroundColor',
    }, {
        cssName: 'margin-left',
        propertyName: 'marginLeft',
        unitName: 'px',
    }, {
        cssName: 'padding-left',
        propertyName: 'paddingLeft',
        unitName: 'px',
    }, {
        cssName: 'width',
        propertyName: 'width',
        unitName: 'px',
    },{
        cssName: 'transform',
        propertyName: 'transform',
    }],
    cssSelector: ['focus', 'hover'],
});
```

### Variable 
Variable used by theme.
Auto change style when running time by modify the vairiable.

```
type VariableProp = {
    color?: string | NodeValue,
    backgroundColor?: string | NodeValue,
};
type Variable = {
    test: {
        variable: {
            black: string,
            white: string,
        }
    }
};
type Black = {
    'kind': 'black',
};
type White = {
    'kind': 'white',
};
type NodeValue = Black | White;
const getVariableValue = (a: NodeValue) => (v1: Variable) => {
    if (a.kind === 'black') {
        return v1.test.variable.black;
    }
    return v1.test.variable.white;
};
const variable = ofVariable<NodeValue, Variable>({
    variable: {
        test: {
            variable: {
                black: '#000',
                white: '#fff',
            },
        },
    },
    isNodeValue: (a: any): a is NodeValue => !!(a && a.kind && ['black', 'white'].includes(a.kind)),
    getVariableValue,
});
```
### Abbr

```
type C1 = t.AbbrProp<'MH', CssPropertyType, 'marginLeft'>;
type C2 = t.AbbrProp<'C', CssPropertyType, 'color'>;
type AbbrProps = C1 & C2;
const abbrs = ofAbbr<CssPropertyType, AbbrProps>({ MH: ['marginLeft'], C: ['color'] });
```

### Customer Property
Custome property define a new property with **Basic Css Property**.

```
export type IconSvgProp = {
    size: 'inherit' | 'small' | 'medium' | 'large',
};
export type IconSvgPropF = {
    rotate: number,
};
const M1 = M.addProps<IconSvgProp, IconSvgPropF>(
    {
        size: {
            inherit: {
                mkstyle: { width: 20 },
                // iconSize: 'inherit',
            },
            small: {
                mkstyle: {
                    width: 30,
                },
                // backgroundSizeT: 'small',
            },
            medium: {
                mkstyle: {
                    width: 40,
                },
                // backgroundSizeTheme: 'medium',
            },
            large: {
                mkstyle: {
                    width: 50,
                },

            },
        },
    }, {
        rotate: (a: number) => ({
            mkstyle: { transform: `rotate(${a}deg)` },
        }),
    }
);
```

## Using Css Module

```
M1.toTCss({
            size: 'medium', rotate: 70, selector: [{
                name: ':hover',
                value: {
                    rotate: 20,
                    size: 'small',
                    mkstyle: {
                        marginLeft: 1,
                    },
                },
            }],
        })
result:
width: 40px;
transform: rotate(70deg);
:hover {
  transform: rotate(20deg);
  width: 30px;
  margin-left: 1px;
}
```

## Mix variable and properties

```
M1.mixed({
            variable: {
                test: {
                    variable: {
                        black: '#111',
                    },
                },
            },
            props:{
                size: {
                    inherit: {
                        mkstyle: { width: 20 },
                    },
                    small: {
                        mkstyle: {
                            width: 60,
                        },
                    },
                },
            }
        }).toRCss({
            color: 'main', rotate: 70, selector: [{
                name: ':hover',
                value: {
                    rotate: 20,
                    color: 'accent',
                    size:'small',
                    mkstyle: {
                        marginLeft: 1,
                    },
                },
            }],
        })
result:
color: green;
transform: rotate(70deg);
:hover {
  transform: rotate(20deg);
  color: black;
  width: 60px;
  margin-left: 1px;
}
```