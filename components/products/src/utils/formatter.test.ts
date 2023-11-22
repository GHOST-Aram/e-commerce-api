import { test, expect, describe } from "@jest/globals";
import { formatter } from "./formatter";

describe('Formatter Class', () =>{
    test('Capitalizes first character', () =>{
        const formattedName = formatter.formatFieldName('elis')
        expect(formattedName).toStrictEqual('Elis')
    })

    test('Replaces underscore with whitespace', () =>{
        const formattedName = formatter.formatFieldName('hello_world')
        expect(formattedName).toStrictEqual('Hello world')
    })
})