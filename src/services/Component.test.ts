import { assert } from 'chai';
import Component from './Component';

type TestType = {
  text: string;
};

describe('component', () => {
  class TestComponent extends Component<TestType> {
    constructor(props: any) {
      super('div', props);
    }

    render(): DocumentFragment {
      return this.compile('this is a render text');
    }
  }

  it('should be compiled', () => {
    const instance = new TestComponent({});
    const template = '<div><a>text in link</a></div>';
    assert.equal(
      instance.compile(template, {}).firstElementChild?.innerHTML,
      '<a>text in link</a>',
    );
  });

  it('should be text into component', () => {
    const instance = new TestComponent({});
    assert.equal(instance.getContent().innerHTML, 'this is a render text');
  });

  it('should add props into template', () => {
    const instance = new TestComponent({
      text: 'text in link',
    });
    const template = '<div><a>{{text}}</a></div>';
    assert.equal(
      instance.compile(template, instance._props).firstElementChild?.innerHTML,
      '<a>text in link</a>',
    );
  });

  it('should set new props', () => {
    const instance = new TestComponent({
      text: 'text in link',
    });
    const template = '<div><a>{{text}}</a></div>';
    instance.setProps({
      text: 'new text',
    });
    assert.equal(
      instance.compile(template, instance._props).firstElementChild?.innerHTML,
      '<a>new text</a>',
    );
  });
});
