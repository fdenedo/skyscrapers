export class Observer {
    notify(event, data) {
        throw new Error('This method should be overridden by subclass');
    }
}

export class Observable {
    addObserver(observer) {
        this.observers.push(observer);
      }
    
      removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
          this.observers.splice(index, 1);
        }
      }
    
      notifyObservers(event, data) {
        for (const observer of this.observers) {
          observer.notify(event, data);
        }
      }
}