import {defineComponent, h} from 'vue';

export const createVCheckboxStub = ({testId = 'row-selector'} = {}) => defineComponent({
  name: 'VCheckbox',
  emits: ['click'],
  setup(_, {emit}) {
    return () => h('button', {
      'type': 'button',
      'data-test': testId,
      'onClick': () => emit('click', {
        stopPropagation: () => {},
      }),
    }, 'select');
  },
});

export const createVDataTableStub = ({
  testId = 'data-table',
  renderRow,
} = {}) => defineComponent({
  name: 'VDataTable',
  props: {
    items: {type: Array, default: () => []},
    headers: {type: Array, default: () => []},
    itemValue: {type: String, required: false},
    modelValue: {type: Array, default: undefined},
  },
  emits: ['update:modelValue'],
  setup(props, {emit, slots}) {
    const isSelected = internalItem => (props.modelValue || []).includes(internalItem.value);
    const toggleSelect = internalItem => emit('update:modelValue', [internalItem.value]);

    return () => h('table', {'data-test': testId}, props.items.map((item) => {
      const internalItem = {value: props.itemValue ? item[props.itemValue] : undefined};
      const slotProps = {
        item,
        internalItem,
        isSelected,
        toggleSelect,
      };

      return renderRow
        ? renderRow({h, item, props, slots, ...slotProps})
        : slots.item?.(slotProps);
    }));
  },
});

