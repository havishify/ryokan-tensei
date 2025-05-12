export default class Property<Type> {
  private _v: Type;

  constructor(v: Type) {
    this._v = v;
  }

  public set value(v: Type) {
    this._v = v;
  }

  public get value(): Type {
    return this._v;
  }
}