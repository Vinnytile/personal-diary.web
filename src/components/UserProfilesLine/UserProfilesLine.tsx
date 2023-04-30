import React from "react";
import { IUserProfile } from "../../interfaces/interfaces";
import './UserProfilesLineStyle.scss'
import { UserProfilePreview } from "../UserProfilePreview/UserProfilePreview";

type UserProfilesLineProps = {
    userProfiles: IUserProfile[],
    onSubscribe(observableId: string): void
    onUnsubscribe(observableId: string): void
}

export const UserProfilesLine: React.FC<UserProfilesLineProps> = ({userProfiles, onSubscribe, onUnsubscribe}) => {

    return (
        <div className="userprofilesline-main">
            <ul>
                {userProfiles.map(userProfile => {
                    return (
                        <li key={userProfile.id} className="userprofilesline-li">
                            <UserProfilePreview userProfile={userProfile} onSubscribe={onSubscribe} onUnsubscribe={onUnsubscribe}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}