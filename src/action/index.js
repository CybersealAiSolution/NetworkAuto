export const SetUserState=(value)=>{
    return {
      type: "USER_STATE",
      payload: {adminAccess:value.accessLevel,delegation:[...value.delegationArray ]}
    }
  }