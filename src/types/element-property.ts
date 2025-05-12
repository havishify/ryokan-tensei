export type ListenerRecord = {
  element: HTMLElement;                                  // 이벤트를 건 대상
  type: keyof HTMLElementEventMap;                       // "click" | "mouseenter" | …
  callback: EventListener;                               // 정확한 이벤트 객체 타입
  options?: boolean | AddEventListenerOptions;           // capture⁄once 등
};

export default class ElementProperty<T extends HTMLElement = HTMLElement> {
  private _v: T | null;
  private _listeners: ListenerRecord[];

  constructor(selector: string = '') {
    this._v = selector.length ? document.querySelector(selector) : null;
    this._listeners = [];
  }

  public set value(v: T | null) {
    if (this._v) this.cleanup();
    this._v = v;
  }

  public get value(): T {
    if (!this._v) throw new Error(`ElementalProperty<${String(typeof this._v)}>.this._v is null`);
    return this._v;
  }

  public addListener<K extends keyof HTMLElementEventMap>(
    type: K,
    cb: (ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    const el = this.value;
    const listener = cb as unknown as EventListener;
    el.addEventListener(type, listener, options);

    this._listeners.push({ element: el, type, callback: listener, options });
  }

  public cleanup(): void {
    for (const { element: el, type, callback, options } of this._listeners) {
      el.removeEventListener(type, callback, options);
    }

    this._listeners.length = 0;
  }
}