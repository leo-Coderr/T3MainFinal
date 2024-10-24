import { useNavigation } from "@react-navigation/native";

export function useCustomNavigation() {
  const navigation = useNavigation();

  const navigateTo = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return {
    navigateTo,
  };
}
