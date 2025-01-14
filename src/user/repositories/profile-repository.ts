import { AppDataSource } from "../../shared/db/datasource";
import { UserContext } from "../../shared/types/UserContext";
import { ProfileEntity } from "./../entities/profile-entity";
import { Profile, ProfileWithUser } from "./../models/profile";

const profileRepository = AppDataSource.getRepository(ProfileEntity);

function toDomain(profileEntity: ProfileEntity): Profile {
  return profileEntity as Profile;
}


export async function createProfile(userContext: UserContext, profile: Profile): Promise<Profile> {
  const newProfile = await profileRepository.save({...profile, user: userContext});
  return toDomain(newProfile);
}

export async function findProfileByUserEmail(email: string): Promise<Profile | null> {
  const foundProfile = await profileRepository.findOne({
    where: {user: {email}}
  })
  return foundProfile ? toDomain(foundProfile) : null; 
}

export async function findProfileById(id: number): Promise<Profile | null> {
  const foundProfile = await profileRepository.findOne({where: {id}});
  return foundProfile ? toDomain(foundProfile) : null;
}

export async function findProfileByUsername(username: string): Promise<ProfileWithUser | null> {
  const foundProfile = await profileRepository.findOne({
    relations: ["user"],
    where: {username}}
  );
  return foundProfile ? foundProfile : null;
}

export async function updateProfileImage(profileId: number, image: string): Promise<void> {
  await profileRepository.update(profileId, {image})
}