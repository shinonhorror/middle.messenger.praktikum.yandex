import Component from './Component';
import Route from './Route';

interface ComponentsType<T = { [x: string]: unknown }> {
  new (props: T): Component<T>;
}
export default class Router {
  private static __instance: Router;

  routes: Array<Route>;

  history: History;

  _currentRoute: Route | null = null;

  _rootQuery: string;

  constructor() {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = '#root';
    Router.__instance = this;
  }

  use(pathname: string, block: ComponentsType) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const target = event.currentTarget as Window;
      this.go(target.location.pathname);
    };
    this.go(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go('/404');
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.navigate(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
