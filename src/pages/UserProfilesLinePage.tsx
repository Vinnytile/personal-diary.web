import React, { useEffect, useRef, useState } from "react";
import { ISubscriptionDTO, IUserProfile } from "../interfaces/interfaces";
import UserProfileApi from "../api/UserProfileApi";
import { UserProfilesLine } from "../components/UserProfilesLine/UserProfilesLine";
import JwtApi from "../api/JwtApi";

export const UserProfilesLinePage: React.FC = () => {
    const [initialUserProfiles, setInitialUserProfiles] = useState<IUserProfile[]>([])
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

        setInitialUserProfiles(data)
        setUserProfiles(data)
    };

    useEffect(()  => {
        fetchData()
    }, [])

    const searchUserHandler = async (searchPredicate: string): Promise<void> => {
        if (searchPredicate !== '') {
            const searchedProfiles = initialUserProfiles.filter((obj) => {
                const foundUsers = obj.firstName.includes(searchPredicate)
                || obj.lastName.includes(searchPredicate)
                || obj.username.includes(searchPredicate)
                return foundUsers
            })
    
            setUserProfiles(searchedProfiles)
        }
        else {
            setUserProfiles(initialUserProfiles)
        }
    }

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
            onSearch={searchUserHandler}
        />
    );
}