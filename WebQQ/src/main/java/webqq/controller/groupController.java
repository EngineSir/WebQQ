package webqq.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import webqq.entity.UserGroup;
import webqq.paramter.Result;
import webqq.service.userGroupService;

@Controller
@RequestMapping("/group")
public class groupController
{
	@Resource
	private userGroupService userGroupService;
	@RequestMapping("/queryGroup.do")
	@ResponseBody
	/*
	 * 查询分组
	 */
	
	public Result<List<UserGroup>> executeQueryGroup(HttpServletRequest req){
		Result<List<UserGroup>> result=new Result<List<UserGroup>>();
		result=userGroupService.queruGroup(req);
		return result;
	}
}
