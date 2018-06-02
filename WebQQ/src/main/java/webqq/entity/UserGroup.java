package webqq.entity;

public class UserGroup
{
	private String groupId;
	private String userId;
	private String groupName;
	private String friendId;
	public String getGroupId()
	{
		return groupId;
	}
	public void setGroupId(String groupId)
	{
		this.groupId = groupId;
	}
	public String getUserId()
	{
		return userId;
	}
	public void setUserId(String userId)
	{
		this.userId = userId;
	}
	public String getGroupName()
	{
		return groupName;
	}
	public void setGroupName(String groupName)
	{
		this.groupName = groupName;
	}
	public String getFriendId()
	{
		return friendId;
	}
	public void setFriendId(String friendId)
	{
		this.friendId = friendId;
	}
	@Override
	public String toString()
	{
		return "userGroup [groupId=" + groupId + ", userId=" + userId + ", groupName=" + groupName + ", friendId="
		        + friendId + "]";
	}
	
}
