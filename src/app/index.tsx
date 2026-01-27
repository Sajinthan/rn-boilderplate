import { Redirect } from 'expo-router';

/**
 * Root index - redirects to Focus tab
 */
export default function Index() {
  return <Redirect href="/(tabs)/focus" />;
}
