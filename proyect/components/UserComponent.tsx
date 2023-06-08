import Link from 'next/link'
import { Button } from '@material-ui/core'
import React from 'react'
import Image from 'next/image'
import { cardProfileStyle } from './Styles'
import { Project_Page_Ctx, IContext } from '../store/context/project-context'

import RatingLogo from '../public/rate.png'
import LeaderLogo from '../public/leader.png'
import ProfileImage from '../public/fake_woman.jpg'
import ProjectLogo from '../public/project-management.png'

interface IProps {
  userId?: number | string | null
  projectId?: string | string[]
}

const UserComponent: React.FC<IProps> = ({ userId, projectId }) => {
  const classes = cardProfileStyle()

  return (
    <>
      <div className='card'>
        <div className='imgBox'>
          <Image
            className={classes.image}
            src={ProfileImage}
            alt='Picture of the author'
            layout='fill'
          />
        </div>
        <div className='content'>
          <div className='details'>
            <h2>
              Alina Smith
              <br />
              <span> Harry Potter Fan</span>
            </h2>
            <div className='data'>
              <h3>
                <span>
                  <Image
                    src={ProjectLogo}
                    alt='Rate logo'
                    width={40}
                    height={40}
                  />
                </span>
                <br />
                2<br /> <span>Projects</span>
              </h3>
              <h3>
                <span>
                  <Image
                    src={RatingLogo}
                    alt='Rate logo'
                    width={40}
                    height={40}
                  />
                </span>
                <br />
                3.4
                <br /> <span>Average Rating</span>
              </h3>
              <h3>
                <span>
                  <Image
                    src={LeaderLogo}
                    alt='Leader logo'
                    width={40}
                    height={40}
                  />
                </span>
                <br />
                Leader
                <br /> <span>Position</span>
              </h3>
            </div>
            <div className='actionBtn'>
              <Button
                className={classes.button}
                variant='outlined'
                fullWidth
                color='primary'
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// <Image  src={ImageCreateMenu} alt='Create Menu' width={400} height={400} layout="fill"   />
export default UserComponent
