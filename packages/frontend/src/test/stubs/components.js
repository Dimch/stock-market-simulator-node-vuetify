import {defineComponent, h} from 'vue';

export const UiTitleCardStub = defineComponent({
  name: 'UiTitleCard',
  props: {
    title: {type: String, required: true},
  },
  setup(props, {slots}) {
    return () => h('section', {'data-test': 'title-card'}, [
      h('h2', props.title),
      slots.default?.(),
    ]);
  },
});

export const VChipStub = defineComponent({
  name: 'VChip',
  props: {
    color: {type: String, default: ''},
    border: {type: String, default: ''},
  },
  setup(props, {slots}) {
    return () => h('span', {
      'data-test': 'chip',
      'data-color': props.color,
      'data-border': props.border,
    }, slots.default?.());
  },
});

export const createVChartStub = () => defineComponent({
  name: 'VChart',
  props: {
    option: {type: Object, required: true},
    autoresize: {type: Boolean, default: false},
  },
  setup(props) {
    return () => h('div', {
      'data-test': 'chart',
      'data-autoresize': String(props.autoresize),
    }, JSON.stringify(props.option));
  },
});

