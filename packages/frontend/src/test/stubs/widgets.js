import {defineComponent, h} from 'vue';

export const createTextStub = ({name, testId, text}) => defineComponent({
  name,
  setup() {
    return () => h('div', {'data-test': testId}, text);
  },
});

export const createPropTextStub = ({name, propName, testId}) => defineComponent({
  name,
  props: {
    [propName]: {type: String, required: false},
  },
  setup(props) {
    return () => h('div', {'data-test': testId}, props[propName] || '');
  },
});

export const createModelValueButtonStub = ({name, testId, nextValue}) => defineComponent({
  name,
  props: {
    modelValue: {type: String, default: undefined},
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    return () => h('button', {
      'type': 'button',
      'data-test': testId,
      'onClick': () => emit('update:modelValue', nextValue),
    }, props.modelValue);
  },
});
