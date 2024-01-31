// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import KinstreeAppLayout from 'src/layouts/KinstreeAppLayout/KinstreeAppLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={KinstreeAppLayout}>
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Set wrap={ScaffoldLayout} title="Members" titleTo="members" buttonLabel="New Member" buttonTo="newMember">
          <Route path="/members/new" page={MemberNewMemberPage} name="newMember" />
          <Route path="/members/{id}/edit" page={MemberEditMemberPage} name="editMember" />
          <Route path="/members/{id}" page={MemberMemberPage} name="member" />
          <Route path="/members" page={MemberMembersPage} name="members" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Parents" titleTo="parents" buttonLabel="New Parent" buttonTo="newParent">
          <Route path="/parents/new" page={ParentNewParentPage} name="newParent" />
          <Route path="/parents/{id}/edit" page={ParentEditParentPage} name="editParent" />
          <Route path="/parents/{id}" page={ParentParentPage} name="parent" />
          <Route path="/parents" page={ParentParentsPage} name="parents" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
