import { expect } from 'chai';
import * as Sinon from 'sinon';
import router from './Router';

describe('router', () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;
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
    router.forward();
    expect((window.history.forward as any).callCount).to.eq(1);
  });
  it('back', () => {
    router.back();
    expect((window.history.back as any).callCount).to.eq(1);
  });
  // it('should go to passed location on popstate', () => {
  //   window.onpopstate({

  //   })
  // })
});
