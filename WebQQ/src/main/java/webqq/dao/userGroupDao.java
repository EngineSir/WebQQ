package webqq.dao;

import java.util.List;

import webqq.entity.User;
import webqq.entity.UserGroup;

public interface userGroupDao
{
	//添加默认分组
	public void addGroup(UserGroup group);
	//查询分组
	public List<UserGroup> queryGroup(String userId);
	//查询指定分组
	public UserGroup queryOneGroup(String userId);
	//获取好友列表
		public List<User> getFriendList(String userId);
}
