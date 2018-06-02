package webqq.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import webqq.entity.UserGroup;
import webqq.paramter.Result;

public interface userGroupService
{
	//查询分组
	public Result<List<UserGroup>> queruGroup(HttpServletRequest req);
}
