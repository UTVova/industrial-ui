<script>
  import {getContext} from 'svelte';
  import {current_component} from 'svelte/internal';
  import {getEventAction} from '../utils/dispatch-events';
  import filterIsProps from '../utils/is-properties';
  import clickOutside from '../utils/click-outside';
  import checkPosition from '../utils/check-position';
  import filterProps from '../utils/filter-props';
  import composeClasses from '../utils/compose-classes';
  import dynamic from '../utils/transition';

  const globalConfig = getContext('iui-config');
  const config = globalConfig.components.dropdown;
  const events = getEventAction(current_component);

  export let triggerClass = '';
  export let dropdownClass = '';
  export let openOnHover = false;
  export let id = null;
  export let value = false;
  export let transition = null;
  export let transitionOptions = null;
  export let position = null;
  const propsList = ['id', 'class', 'position', 'triggerClass', 'dropdownClass', 'value', 'openOnHover', 'transition', 'transitionOptions', ...Object.keys(config.isProperties)];

  if (!id) console.warn('Dropdown has no id property. It may cause click-outside work not as expected.');

  const close = () => value = false;
  const open = () => value = true;
  const hoverEffect = (isEntered) => {
    if (!openOnHover) return;
    value = isEntered;
  }
</script>

<div
  {id}
  class={composeClasses(
    globalConfig.globalClass,
    config.class,
    $$props.class,
    filterIsProps(config.isProperties, $$props),
    value ? config.openClass : config.closeClass
  )}
  {...filterProps(propsList, $$props)}
  use:clickOutside={close}
  use:events
  on:mouseenter={() => hoverEffect(true)}
  on:mouseleave={() => hoverEffect(false)}
>

  <!-- Trigger element -->
  <slot name="nowrap-trigger">
    <div
      tabindex="0"
      class={composeClasses(config.triggerClass, triggerClass, value ? config.openTriggerClass : config.closeTriggerClass)}
      on:click={() => value = !value}
    >
      <slot name="trigger" />
    </div>
  </slot>

  <slot name="nowrap-dropdown" {close} {open} {value} />

  <!-- Dropdown itself -->
  {#if value}
    <div
      class={composeClasses(config.dropdownClass, dropdownClass, value ? config.openDropdownClass : config.closeDropdownClass)}
      transition:dynamic={{transition: transition || config.transition, options: transitionOptions || config.transitionOptions, customs: globalConfig.customTransitions}}
      use:checkPosition={position}
    >
      <slot {close} {open} {value} />
    </div>
  {/if}
</div>
