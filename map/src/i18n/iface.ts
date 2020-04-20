import en from './langs/en.json';

/**
 * Interface containing all the strings throughout the application that we want
 * to have translated
 */
export type Strings = typeof en;

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type PartialStrings = RecursivePartial<Strings>;

interface L<Strings> {
  meta: {
    name: string;
    /**
     * What direction does this language use? Right-To-Left of Left-To-Right?
     */
    direction: 'rtl' | 'ltr';
  };
  strings: Strings;
}

export type Language = L<Strings>;
export type PartialLanguage = L<PartialStrings>;