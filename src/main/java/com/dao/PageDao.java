package com.dao;

import com.pojo.Page;
import com.pojo.Paper;

import java.util.List;

public interface PageDao {
    public int add(Page page);

    public void delete(int id);

    public Page get(int id);

    public int update(Page page);

    public List<Page> list();

    public List<Page> list(Page page);

    public int total();

}
