export default class Property<Type> {
  private _v: Type;
  private setAfter: (v: Type) => void;
  private getBefore: (v: Type) => void;

  constructor(v: Type, setAfter: (v: Type) => void = (_: Type) => {}, getBefore: (v: Type) => void = (_: Type) => {}) {
    this._v = v;
    this.setAfter = setAfter;
    this.getBefore = getBefore;
  }

  public set value(v: Type) {
    this._v = v;

    this.setAfter(this._v);
  }

  public get value(): Type {
    this.getBefore(this._v);

    return this._v;
  }
}