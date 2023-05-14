import React, { useRef } from "react";
import { IUserProfile } from "../../interfaces/interfaces";
import './UserProfilesLineStyle.scss'
import { UserProfilePreview } from "../UserProfilePreview/UserProfilePreview";

type UserProfilesLineProps = {
    userProfiles: IUserProfile[],
    onSubscribe(observableId: string): void
    onUnsubscribe(observableId: string): void
    onSearch(searchPredicate: string): void
}

export const UserProfilesLine: React.FC<UserProfilesLineProps> = ({userProfiles, onSubscribe, onUnsubscribe, onSearch}) => {
    const refUserSearch = useRef<HTMLInputElement>(null)

    return (
        <div className="userprofilesline-main">
            <div>
                <label htmlFor="searchuser" className="form-label"> 
                    Search user:
                </label>
                    <input
                        ref={refUserSearch} 
                        type="text" 
                        id="searchuser" 
                        placeholder="your_email@gmail.com"
                        className="form-control form-control-own-reg"
                        onChange={()=> onSearch(refUserSearch.current.value)}
                    />
            </div>
            <div>
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
        </div>
    );
}