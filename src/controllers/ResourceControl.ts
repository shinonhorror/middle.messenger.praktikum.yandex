import ResourceAPI from '~src/api/ResourceAPI';

const resourceApi = new ResourceAPI();

class ResourceControl {
  public async getResource(pathname: string) {
    const url = await resourceApi.request(pathname);
    return url;
  }

  public async getCreatedResource(data: FormData) {
    const resource = await this.createResource(data);
    return resource;
  }

  public async createResource(data: FormData) {
    try {
      await resourceApi.create(data);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new ResourceControl();
