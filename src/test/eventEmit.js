// class EventEmit {
//   constructor() {
//     this.events = new Map();

//   }

//   on(eventName, callBack) {
//     if (this.events.has(eventName)) {
//       this.events.get(eventName).push(callBack)
//     } else {
//       this.events.set(eventName, [callBack])
//     }
//   }
//   emit(eventName) {
//     if (this.events.has(eventName)) {
//       (this.events.get(eventName) || []).forEach(callBack => {
//         callBack()
//       });
//     }
//   }

//   off(eventName) {
//     this.events.delete(eventName)
//   }

//   once(eventName, callBack){

//   }
// }


class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
  }
  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return;
    }
    this.events.get(eventName).forEach(callback => callback && callback(...args));
  }
  off(eventName, callback) {
    if (!this.events.has(eventName)) {
      return;
    }
    this.events.set(eventName, callback ? this.events.get(eventName).filter(fn => fn !== callback) : []);
  }
  once(eventName, callback) {
    const fn = (...args) => {
      callback && callback && callback(...args);
      this.off(eventName, fn);
    }
    this.on(eventName, fn);
  }
}