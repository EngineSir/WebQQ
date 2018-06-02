package webqq.entity;

public class ChatInfo
{
	private String friendId;
	private String infoText;
	private int state;
	public String getFriendId()
	{
		return friendId;
	}
	public void setFriendId(String friendId)
	{
		this.friendId = friendId;
	}
	public String getInfoText()
	{
		return infoText;
	}
	public void setInfoText(String infoText)
	{
		this.infoText = infoText;
	}
	public int getState()
	{
		return state;
	}
	public void setState(int state)
	{
		this.state = state;
	}
	@Override
	public String toString()
	{
		return "chatInfo [friendId=" + friendId + ", infoText=" + infoText + ", state=" + state + "]";
	}
	
}
