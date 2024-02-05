import Wrapper from "./wrapper";
import Toggle, { ToggleSkeleton } from "./toggle";
import Recommended, { RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowedUser } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";
const Sidebar = async () => {
  const recommended = await getRecommended();
  const follows = await getFollowedUser();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={follows} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};
export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
