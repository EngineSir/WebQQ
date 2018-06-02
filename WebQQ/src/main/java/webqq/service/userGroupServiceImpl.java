package webqq.service;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import webqq.dao.userGroupDao;
import webqq.entity.UserGroup;
import webqq.paramter.Result;
@Service("userGroupService")
public class userGroupServiceImpl implements userGroupService
{
	@Resource
	private userGroupDao usergroupdao;
	public Result<List<UserGroup>> queruGroup(HttpServletRequest req)
	{
		Result<List<UserGroup>> result=new Result<List<UserGroup>>();
		HttpSession session=req.getSession();
		String userId=(String)session.getAttribute("userId");
		List<UserGroup> list=usergroupdao.queryGroup(userId);
		result.setData(list);
		result.setMsg("查询成功");
		result.setState(0);
		return result;
	}

}
