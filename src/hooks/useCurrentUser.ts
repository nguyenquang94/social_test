import { useTypedSelector } from "./useTypedSelector";
import _ from "lodash";

export const useCurrentUser = () => {
    return useTypedSelector((state) => {
        const result = _.cloneDeep(state.auth.user);
        if (result) {
            return result;
        }
        return null;
    });
};
