class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.state = config.initial;
      this.states = config.states;
      this.arrStates = [];
      this.arrRedo = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;

    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      let k=0;
      for (let i=0; i<Object.keys(this.states).length; i++) {
         if (state!==Object.keys(this.states)[i]) {
          k++;
        }
      }

      if (k===Object.keys(this.states).length) {
        throw  new Error;
      } else {
        this.arrStates.push(this.state);
        this.arrRedo = [];
        this.state = state;
      }


    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

      let obj = this.states[this.state].transitions;
      if (!obj.hasOwnProperty(event)) {
         throw new Error;
       } else {
        this.arrStates.push(this.state);
        this.arrRedo = [];
        this.state = obj[event];
       }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let arr = [];
      if (!event) {
        return Object.keys(this.states);  //// Error if event omit
      } else {
        for (let key in this.states) {
          let obj = this.states[key].transitions;
          if (obj.hasOwnProperty(event)) {
            arr.push(key);
           }
        }
      }
      return arr;

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (!this.arrStates.length){
        return false;
      } else {
        this.arrRedo.push(this.state);
        this.state = this.arrStates.pop();
        return true;
      }

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (!this.arrRedo.length){
        return false;
      } else {
        this.state = this.arrRedo.pop();
        return true;

      }

    }


    /**
     * Clears transition history
     */
    clearHistory() {
      this.arrRedo = [];
      this.arrStates = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
