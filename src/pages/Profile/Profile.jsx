import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { checkProfileCompleteness } from './profileHelpers';
import ProfileCompletionBanner from './ProfileCompletionBanner';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import ProfileSidebar from './ProfileSidebar';
import ProfileFormModal from '../../components/ProfileFormModal';

import ProfileSkeleton from '../skeletons/ProfileSkeleton';
import { FaExclamationCircle } from 'react-icons/fa';
import ProfileForm from './ProfileForm/ProfileForm';
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '../../features/user/userApi';



const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('edit');
  const { data: user, isLoading, isError, error, refetch: refetchProfile } = useGetMyProfileQuery();
  const [updateMyProfile, { isLoading: loading }] = useUpdateMyProfileMutation()

  console.log(user, 'thsi is the user form backend')
  useEffect(() => {
    if (user) {
      const isProfileComplete = checkProfileCompleteness(user);
      if (!isProfileComplete && user) {
        setFormMode('create');
        setShowFormModal(true);
      }
    }



  }, [user])





  const handleSave = async (updatedData) => {
    console.log('Saving data:', updatedData);

    try {



      const response = await updateMyProfile(updatedData).unwrap();



      setShowFormModal(false);


      await refetchProfile();

      toast.success('Profile updated successfully!');

    } catch (error) {
      console.error('Error updating profile:', error);


      await refetchProfile();

      toast.error(
        error.data?.message ||
        error.message ||
        'Failed to update profile. Please try again.'

      );
    }
  };



  const handleCancel = () => {
    setShowFormModal(false);
  };

  if (isLoading) return <ProfileSkeleton />

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <FaExclamationCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">User not found</h3>
          <p className="text-text-secondary">The requested profile could not be loaded.</p>
        </div>
      </div>
    );
  }

  const isProfileComplete = checkProfileCompleteness(user);


  return (
    <>
      <div className="min-h-screen bg-bg text-text-primary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
          {!isProfileComplete && user && (
            <ProfileCompletionBanner
              setFormMode={setFormMode}
              setShowFormModal={setShowFormModal}
            />
          )}

        
          <ProfileHeader
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowFormModal={setShowFormModal}
          />

   
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
            <ProfileSidebar user={user} />

      
            <div className="lg:col-span-2">
              <ProfileContent
                user={user}
                activeTab={activeTab}
              />
            </div>
          </div>
        </div>
      </div>


      <ProfileFormModal
        isOpen={showFormModal}
        onClose={handleCancel}
        title={formMode === 'create' ? 'Complete Your Profile' : 'Edit Profile'}
      >

        <ProfileForm
          user={user}
          onSave={handleSave}
          onCancel={handleCancel}
          mode={formMode}
          refetchUser={refetchProfile}
        />
      </ProfileFormModal>
    </>
  );
};

export default ProfilePage;