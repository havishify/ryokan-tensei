export default class ElementProperty<Type> {
  private _v: Type | null;

  constructor() {
    this._v = null;
  }

  public set value(v: Type | null) {
    this._v = v;
  }

  public get value(): Type {
    if (!this._v) throw new Error(`ElementalProperty<${String(typeof this._v)}>.this._v is null`);

    return this._v;
  }
}