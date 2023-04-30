import React, { useEffect, useState } from "react";
import { ISubscriptionDTO, IUserProfile } from "../interfaces/interfaces";
import UserProfileApi from "../api/UserProfileApi";
import { UserProfilesLine } from "../components/UserProfilesLine/UserProfilesLine";
import JwtApi from "../api/JwtApi";

export const UserProfilesLinePage: React.FC = () => {
    const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([])

    const fetchData = async () => {
        const userIdentityId: string = JwtApi.getUserIdFromJwt()
        const data = await UserProfileApi.getUserProfiles()

        const indexOfObject = data.findIndex((object) => {
            return object.userIdentityFID === userIdentityId;
        });

        if (indexOfObject !== -1) {
            data.splice(indexOfObject, 1);
        }

        setUserProfiles(data)
    };

    useEffect(()  => {
        fetchData()
    }, [])

    const subscribeUserHandler = async (observableId: string): Promise<void> => {
        const userIdentityId: string = JwtApi.getUserIdFromJwt()
        const subscription: ISubscriptionDTO = {
          subscriberFID: userIdentityId,
          observableFID: observableId
        }

        await UserProfileApi.subscribeUser(subscription)
    }

    const unsubscribeUserHandler = async (observableId: string): Promise<void> => {
        const userIdentityId: string = JwtApi.getUserIdFromJwt()
        const subscription: ISubscriptionDTO = {
          subscriberFID: userIdentityId,
          observableFID: observableId
        }

        await UserProfileApi.unsubscribeUser(subscription)
    }

    return (
            <UserProfilesLine 
                userProfiles={userProfiles}
                onSubscribe={subscribeUserHandler}
                onUnsubscribe={unsubscribeUserHandler}
            />
    );
}