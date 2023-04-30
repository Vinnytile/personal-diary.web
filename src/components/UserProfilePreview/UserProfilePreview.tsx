import React from "react";
import '@react-page/editor/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import { IUserProfile } from "../../interfaces/interfaces";

type UserProfilePreviewProps = {
    userProfile: IUserProfile,
    onSubscribe(observableId: string): void
    onUnsubscribe(observableId: string): void
}

export const UserProfilePreview: React.FC<UserProfilePreviewProps> = ({userProfile, onSubscribe, onUnsubscribe}) => {
    const subscribeClickHandler = async (id: string) => {
        await onSubscribe(id);
    }

    const unsubscribeClickHandler = async (id: string) => {
        await onUnsubscribe(id);
    }

    return (
        <div className="userprofileinline-general">
            <span>
                {userProfile.username} {userProfile.firstName} {userProfile.lastName}
            </span>
            <button 
                onClick={event => subscribeClickHandler(userProfile.id)}
                className="btn btn-success create-button"
            >
                Subscribe
            </button>
            <button 
                onClick={event => unsubscribeClickHandler(userProfile.id)}
                className="btn btn-success create-button"
            >
                Unsubscribe
            </button>
        </div>
    );
}