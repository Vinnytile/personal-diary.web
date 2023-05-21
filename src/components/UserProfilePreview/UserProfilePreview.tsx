import React from "react";
import '@react-page/editor/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import { IUserProfile } from "../../interfaces/interfaces";
import './UserProfilePreviewStyle.scss'

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
        <div className="profilepreview-general">
            <div>
                <div>Username: {userProfile.username}</div>
                <div>Firstname: {userProfile.firstName}</div>
                <div>LastName: {userProfile.lastName}</div>
            </div>
            <div className="profilepreview-buttons">
                <button 
                    onClick={event => subscribeClickHandler(userProfile.id)}
                    className="btn btn-success profilepreview-button"
                >
                    Subscribe
                </button>
                <button 
                    onClick={event => unsubscribeClickHandler(userProfile.id)}
                    className="btn btn-success profilepreview-button"
                >
                    Unsubscribe
                </button>
            </div>
        </div>
    );
}