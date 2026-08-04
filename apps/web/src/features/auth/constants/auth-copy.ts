type AuthMode = 'sign-in' | 'sign-up';

type AuthCopy = {
  label: string;
  title: string;
  subtitle: string;
  crossLinkPrompt: string;
  crossLinkLabel: string;
  crossLinkTo: '/sign-in' | '/sign-up';
};

const authCopy: Record<AuthMode, AuthCopy> = {
  'sign-in': {
    label: 'sign in',
    title: 'welcome back',
    subtitle:
      'pick up where you left off — your activities, friends, and requests.',
    crossLinkPrompt: "don't have an account?",
    crossLinkLabel: 'join',
    crossLinkTo: '/sign-up',
  },
  'sign-up': {
    label: 'join riadom',
    title: 'find your people',
    subtitle:
      'discover activities near you and meet people by showing up, not swiping.',
    crossLinkPrompt: 'already have an account?',
    crossLinkLabel: 'sign in',
    crossLinkTo: '/sign-in',
  },
};

export { authCopy };
export type { AuthMode, AuthCopy };
