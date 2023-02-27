import { expect } from 'chai';
import {
  isEqual, isObject, merge, queryStringify, set,
} from './helpers';

describe('helpers functions', () => {
  describe('set', () => {
    it('should return passed object if it is not an object', () => {
      // arrange
      const obj = 1;
      // act
      const res = set(1, 'string', 1);
      // assert
      expect(res).to.eq(obj);
    });
    it('should return passed null if null is passed as first arg', () => {
      // arrange
      const obj = null;
      // act
      const res = set(null, 'string', 1);
      // assert
      expect(res).to.eq(obj);
    });
    it('should throw error if path is not a string', () => {
      // arrange
      const obj = {};
      const path = 3 as any;
      // act
      const fn = () => set(obj, path, 1);
      // assert
      expect(fn).to.throw(Error);
    });
    it('should set new property to passed object with passed value', () => {
      // arrange
      const obj = {};
      const path = 'c';
      const value = 3;
      // act
      const res = set(obj, path, value);
      // assert
      expect(res[path]).to.eq(value);
    });
    it('should not return new object', () => {
      // arrange
      const obj = { a: 1, b: 2 };
      const path = 'c';
      const value = 3;
      // act
      const res = set(obj, path, value);
      // assert
      expect(res).to.eq(obj);
    });
  });
  describe('isObject', () => {
    it('should return false if argument is not an object', () => {
      // arrange
      const obj = 1 as any;
      // act
      const res = isObject(obj);
      // assert
      expect(res).to.eq(false);
    });
  });
  describe('merge', () => {
    it('should not return new object', () => {
      // arrange
      const obj1 = { a: { b: { a: 2 } }, d: 5 };
      const obj2 = { a: { b: { c: 1 } } };
      // act
      const res = merge(obj1, obj2);
      // assert
      expect(res).to.eq(obj1);
    });
  });
  describe('isEqual', () => {
    it('should return false if arguments have different length', () => {
      // arrange
      const obj1 = { a: { b: { a: 2 } }, d: 5 };
      const obj2 = { a: { b: { c: 2 } } };
      // act
      const res = isEqual(obj1, obj2);
      // assert
      expect(res).to.eq(false);
    });
    it('should return false if values in objects different', () => {
      // arrange
      const obj1 = { a: { b: { a: 2 } }, d: 2 };
      const obj2 = { a: { b: { c: 2 } }, d: 5 };
      // act
      const res = isEqual(obj1, obj2);
      // assert
      expect(res).to.eq(false);
    });
    it('should return false if values in nested objects different', () => {
      // arrange
      const obj1 = { a: { b: { a: 2 } }, d: 5 };
      const obj2 = { a: { b: { c: 1 } }, d: 5 };
      // act
      const res = isEqual(obj1, obj2);
      // assert
      expect(res).to.eq(false);
    });
  });
  describe('queryStringify', () => {
    it('should throw error if data is not a object', () => {
      // arrange
      const obj = 5 as any;
      // act
      const fn = () => queryStringify(obj);
      // assert
      expect(fn).to.throw(Error);
    });
  });
});
