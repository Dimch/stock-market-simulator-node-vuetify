<script setup>
import {ref} from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import useClipboard from 'vue-clipboard3';

// icons
import {CopyOutlined, ScissorOutlined} from '@ant-design/icons-vue';

const {toClipboard} = useClipboard();

const text = ref('https://berrydashboard.io/');
const textArea = ref(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
);
const textArea1 = ref(
  'Lorem ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga.'
);
const page = ref({title: 'Clipboard Page'});
const snackbar = ref(false);
const snackbar1 = ref(false);

const copy = async () => {
  try {
    await toClipboard(text.value);
    snackbar.value = true;
  } catch (e) {
    console.error(e);
  }
};

const copyTextArea = async () => {
  try {
    await toClipboard(textArea.value);
    snackbar.value = true;
  } catch (e) {
    console.error(e);
  }
};

const cutTextArea = async () => {
  try {
    const selectedText = textArea.value;

    if (selectedText) {
      // Remove the selected text from the textarea
      const newText = '';
      textArea.value = newText;

      // Copy the selected text to the clipboard
      await toClipboard(selectedText);
      snackbar1.value = true;
    }
  } catch (e) {
    console.error(e);
  }
};

const copyTextArea1 = async () => {
  try {
    await toClipboard(textArea1.value);
    snackbar.value = true;
  } catch (e) {
    console.error(e);
  }
};

function isButtonDisabled() {
  return textArea.value.trim().length === 0;
}

const breadcrumbs = ref([
  {
    title: 'Plugins',
    disabled: false,
    href: '#'
  },
  {
    title: 'Clipboard',
    disabled: true,
    href: '#'
  }
]);
</script>
<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <v-row>
        <v-col md="12" cols="12">
          <UiParentCard title="Copy from TextField">
            <div>
              <v-label class="mb-1">Enter Website</v-label>
              <v-text-field
                color="primary"
                aria-label="website"
                label="Website"
                variant="outlined"
                single-line
                hide-details
                class="pe-0"
                v-model="text"
              >
                <template #append-inner>
                  <v-btn variant="text" icon rounded @click="copy">
                    <CopyOutlined :style="{color: 'rgb(var(--v-theme-lightText))'}" />
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </UiParentCard>
        </v-col>
        <v-col md="12" lg="6" cols="12">
          <UiParentCard title="Copy from TextArea">
            <div>
              <v-label class="mb-1">Enter Text to Copy</v-label>
              <v-textarea
                class="textarea-input"
                aria-label="website"
                variant="outlined"
                name="input-7-4"
                filled
                label="Copy text"
                single-line
                v-model="textArea"
              ></v-textarea>
              <v-btn color="primary" @click="copyTextArea" variant="flat" size="small" class="me-2" :disabled="isButtonDisabled()">
                <template #prepend>
                  <CopyOutlined />
                </template>
                Copy
              </v-btn>
              <v-btn color="error" @click="cutTextArea" variant="flat" size="small" :disabled="isButtonDisabled()">
                <template #prepend>
                  <ScissorOutlined />
                </template>
                Cut
              </v-btn>
            </div>
          </UiParentCard>
        </v-col>
        <v-col md="12" lg="6" cols="12">
          <UiParentCard title="Copy from Container">
            {{ textArea1}}
            <v-btn color="primary" variant="text" class="headerBtn" icon rounded @click="copyTextArea1">
              <CopyOutlined />
            </v-btn>
          </UiParentCard>
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbar" color="success" :timeout="3000" top right rounded="pill">
        <v-icon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></v-icon>
        Text Copied!
      </v-snackbar>
      <v-snackbar v-model="snackbar1" color="success" :timeout="3000" top right rounded="pill">
        <v-icon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></v-icon>
        Text Cut!
      </v-snackbar>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.v-text-field {
  &.pe-0 {
    .v-field--appended {
      padding-right: 0;
      [dir='rtl'] & {
        padding-right: unset;
        padding-left: 0;
      }
    }
  }
}
.headerBtn {
  position: absolute;
  right: 20px;
  top: 10px;
  [dir='rtl'] & {
    right: unset;
    left: 20px;
  }
}
</style>
