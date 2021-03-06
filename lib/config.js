/**
 * Default IUI configuration. Read more about it here: https://industrial-ui.now.sh/docs/configuration
 */

export default {
  stylesheets: [],
  globalClass: '',
  customTransitions: {},

  components: {
    button: {
      isProperties: {},
      class: '',
    },

    dropdown: {
      transition: null,
      transitionOptions: null,
      isProperties: {},

      class: '',
      openClass: '',
      closeClass: '',

      triggerClass: '',
      openTriggerClass: '',
      closeTriggerClass: '',

      dropdownClass: '',
      openDropdownClass: '',
      closeDropdownClass: '',
    },

    card: {},
  }
};
