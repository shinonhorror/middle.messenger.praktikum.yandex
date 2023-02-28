import { expect } from 'chai';
import * as Sinon from 'sinon';
import router from './Router';
import Component from './Component';

type TestType = {
  text: string;
};

describe('router', () => {
  // arrange
  const originalForward = window.history.forward;
  const originalBack = window.history.back;
  class TestComponent extends Component<TestType> {
    constructor(props: any) {
      super('div', props);
    }

    render(): DocumentFragment {
      return this.compile('this is a render text');
    }
  }
  beforeEach(() => {
    router.reset();
    window.history.forward = Sinon.fake();
    window.history.back = Sinon.fake();
  });
  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });
  it('forward', () => {
    // act
    router.forward();
    // assert
    expect((window.history.forward as any).callCount).to.eq(1);
  });
  it('back', () => {
    // act
    router.back();
    // assert
    expect((window.history.back as any).callCount).to.eq(1);
  });
  it('should go to passed location', () => {
    // act
    router.use('/test', TestComponent);
    router.go('/test');
    // assert
    expect(window.location.pathname).to.eq('/test');
  });
  it('should fo to notFound page if location is not found', () => {
    // act
    router.use('/404', TestComponent);
    router.go('/test');
    // assert
    expect(window.location.pathname).to.eq('/404');
  });
});
