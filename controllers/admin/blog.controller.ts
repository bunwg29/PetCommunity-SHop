import { Request, Response } from 'express';
import BlogModel from '../../models/blog.model';
import moment from 'moment';
import { systemConfig } from '../../config/adminPrefix';
import { Pagination } from '../../helpers/pagination.helper';

// [GET] admin/blog
export const index = async (req: Request, res: Response) => {
  const pagination = await Pagination(req, BlogModel, {});
  const blog = await BlogModel.find()
    .limit(pagination.limitItems)
    .skip(pagination.skip);

  const blogInfo = blog.map((item) => ({
    ...item.toObject(),
    createDate: moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss'),
  }));

  res.render('admin/pages/blog/index', {
    title: 'Admin | Blog',
    blogInfo,
    pagination,
  });
};

// [GET] admin/blog/detail/id
export const blogDetail = async (req: Request, res: Response) => {
  const blogData = await BlogModel.findOne({
    _id: req.params.id,
  });

  res.render('admin/pages/blog/detail.pug', {
    title: 'Admin | Blog-Detail',
    blogData,
  });
};

// [PATCH] admin/blog/edit/:id
export const blogPatch = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-blog')) {
    const id_blog = req.params.id;

    const newBlogData = {
      thumbnail_photo: req.body.thumbnail_photo,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      uploadBy: req.body.uploadBy,
    };

    try {
      await BlogModel.updateOne({ _id: id_blog }, newBlogData);
      req.flash('success', 'Update success');
      res.redirect(`/${systemConfig.prefixAdmin}/blog`);
    } catch (error) {
      req.flash('error', 'Update failed');
      res.redirect(`/${systemConfig.prefixAdmin}/`);
    }
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};

// [PATCH] admin/blog/edit/:id
export const deleteBlog = async (req: Request, res: Response) => {
  if (res.locals.roles.permission.includes('crud-blog')) {
    const idBlog = req.params.id;

    try {
      await BlogModel.deleteOne({
        _id: idBlog,
      });
      req.flash('success', 'Update success');
      res.json({
        code: 200,
      });
    } catch (error) {
      req.flash('error', 'Update failed');
      res.redirect(`/${systemConfig.prefixAdmin}/`);
    }
  } else {
    req.flash('error', 'This is not your role');
    res.redirect(`/${systemConfig.prefixAdmin}/`);
  }
};
