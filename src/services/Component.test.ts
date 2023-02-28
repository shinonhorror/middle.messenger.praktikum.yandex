import { assert } from 'chai';
import Component from './Component';

type TestType = {
  text: string;
};

describe('component', () => {
  // arrange
  class TestComponent extends Component<TestType> {
    constructor(props: any) {
      super('div', props);
    }

    render(): DocumentFragment {
      return this.compile('this is a render text');
    }
  }

  it('should be compiled', () => {
    // arrange
    const instance = new TestComponent({});
    const template = '<div><a>text in link</a></div>';
    // assert
    assert.equal(
      instance.compile(template, {}).firstElementChild?.innerHTML,
      '<a>text in link</a>',
    );
  });

  it('should be text into component', () => {
    // arrange
    const instance = new TestComponent({});
    // assert
    assert.equal(instance.getContent().innerHTML, 'this is a render text');
  });

  it('should add props into template', () => {
    // arrange
    const instance = new TestComponent({
      text: 'text in link',
    });
    const template = '<div><a>{{text}}</a></div>';
    // assert
    assert.equal(
      instance.compile(template, instance._props).firstElementChild?.innerHTML,
      '<a>text in link</a>',
    );
  });

  it('should set new props', () => {
    // arrange
    const instance = new TestComponent({
      text: 'text in link',
    });
    const template = '<div><a>{{text}}</a></div>';
    // act
    instance.setProps({
      text: 'new text',
    });
    // assert
    assert.equal(
      instance.compile(template, instance._props).firstElementChild?.innerHTML,
      '<a>new text</a>',
    );
  });
});
